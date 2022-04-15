import { TranslationLabelEntity } from '../../translation/src/lib/entities/translation.label.item';
import { Like, Not } from 'typeorm';

export interface ITranslatable {}

type Constructor<T = {}> = new (...args: any[]) => T;

export default function Translatable<TBase extends Constructor>(
  Base: TBase,
  keyPrefix: string = ''
) {
  const getTranslationKey = (key) =>
    keyPrefix ? [keyPrefix, key].join(':') : key;

  const sanitizeTranslationKey = (key) => key.replace(keyPrefix + ':', '');

  return class extends Base {
    readonly label?: { [key: string]: string } = {};

    public removeTranslations() {
      const self: any = this;
      if (self.getId() && self.companyId) {
        const customParams = keyPrefix
          ? { key: Like(`${keyPrefix}:%`) }
          : { key: Not(Like(`cat:%`)) };

        TranslationLabelEntity.delete({
          companyId: self.companyId,
          id: self.getId(),
          type: self.type,
          ...customParams,
        });
      }
    }

    public async saveTranslations() {
      let self: any = this;
      if (!self.labels) self.labels = [];
      console.log('called',self.labels.length)
      for (let i = 0; i < self.labels.length; i++) {
        const label: TranslationLabelEntity = self.labels[i];

        if (!isNaN(label.languageId)) {
          await TranslationLabelEntity.delete({
            companyId: self.companyId,
            id: self.getId(),
            key: getTranslationKey(label.key),
            type: label.type,
            languageId: label.languageId,
          });
          label.id = self.getId();
          await TranslationLabelEntity.insert(label);
        }
      }
    }

    public loadTranslation(languageId: number = null, key: string = null) {
      let self: any = this;
      let where = ' where companyId  = ? ';
      const params: any[] = [self.companyId];

      if (languageId) {
        where += ' and languageId = ? ';
        params.push(languageId);
      }

      where += ' and type = ? ';
      params.push(self.type);

      if (key) {
        where += ' and `key` = ? ';
        params.push(getTranslationKey(key));
      }

      where += ' and id = ? ';
      params.push(self.getId());

      return Promise.all([
        TranslationLabelEntity.query(
          ` select value, \`key\`, languageId from ${
            TranslationLabelEntity.getRepository().metadata.tableName
          } ${where}`,
          params
        ),
      ]).then(([languagesShort]: Partial<TranslationLabelEntity[]>[]) => {
        self.labels = [...languagesShort];
        const lables = { lang: 1 };
        self.labels.forEach((item) => {
          if (!lables[languageId]) lables[languageId] = {};
          lables[languageId] = {
            [sanitizeTranslationKey(item.key)]: item.value,
          };
          return lables;
        });
        self.label = <any>lables;
        return lables;
      });
    }

    public setTranslation(key: string, value: string, languageId: number) {
      const translate = TranslationLabelEntity.create();
      const self: any = this;
      translate.assign({
        companyId: self.companyId,
        id: self.getId(),
        type: self.type,
        key: getTranslationKey(key),
        value: value,
        languageId: languageId,
      });
      if (!self.labels) self.labels = [];
      self.labels.push(translate);
    }

    public setTranslations(
      values: { key: string; value: string; languageId: number }[]
    ) {
      return Promise.all(
        values.map((v) => this.setTranslation(v.key, v.value, v.languageId))
      );
    }

    public setTranslationFromLabelObj(objKey, save = false) {
      for (let key in objKey) {
        for (let langId in objKey[key]) {
          this.setTranslation(key, objKey[key][langId], <any>langId);
        }
      }
      if (save) return this.saveTranslations();
    }
  };
}

export const TranslatableUtils = {
  splitLabels(entryRow, keyReplace = '') {
    if (entryRow.labels)
      entryRow.labels.split(',').forEach((keyPair) => {
        let [key, value] = keyPair.split(TranslationLabelEntity.DBSplitter);
        key = keyReplace ? key.replace(keyReplace, '') : key;
        if (!entryRow.label) entryRow.label = {};
        if (!entryRow.label[key]) entryRow.label[key] = {};
        entryRow.label[key][entryRow.languageId] = value;
      });
    return entryRow;
  },
};
