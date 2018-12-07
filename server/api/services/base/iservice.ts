export interface IService {
    getAll(resolve, reject);
    getOne(id: string);
    getSearch(data: any);
    create(data: any);
    update(id: string, data: any);
    delete(id: string);
}