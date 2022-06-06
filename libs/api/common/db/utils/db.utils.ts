import { BaseEntity } from 'typeorm';

/*
 * Force insert
 * if nest is handling many request
 * it fails on incrementing the id in (BeforeInsert)
 * repeat the saving till it works.
 * */
interface insertEntity extends BaseEntity {
  id: number;
}
export const doInsert = async (entity: insertEntity) => {
  // ensure  beforeInsert():any is implemented
  let counter = 0;
  while (!entity.id && counter < 10) {
    try {
      counter++;
      await entity.save();
    } catch (e) {
      console.log('retry', entity, e);
    }
  }
  return entity;
};
