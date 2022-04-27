export const doTransactionInsert = async (entity, repo) => {
  let connection = repo.manager.connection;
  let count = 0;
  let queryRunner = connection.createQueryRunner();
  const save = (entity) =>
    new Promise(async (resolve) => {
      try {
        await queryRunner.startTransaction();
        await queryRunner.manager.save(entity);
        await queryRunner.commitTransaction();
      } catch (e) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        console.log(e);
        resolve(false);
      } finally {
        await queryRunner.release();
      }
      resolve(true);
    });

  while (!(await save(entity)) && count < 50) {
    queryRunner = connection.createQueryRunner();
    count++;
  }

  return entity;
};
