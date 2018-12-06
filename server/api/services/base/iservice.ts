export interface IService {
    getAll(resolve, reject);
    getOne(id: string);
    getSearch(data: any);
    create(data: any);
    update(id: string);
    delete(id: string);
}