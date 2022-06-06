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
  let err;
  while (!entity.id && counter < 5000) {
    try {
      counter++;
      await entity.save();
    } catch (e) {err=e}
  }
  if(err)console.error(err);
  return entity;
};
