import { FilterQuery, Query } from 'mongoose';

class QueryBilder<T> {
    public modelquery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelquery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelquery = modelquery;
        this.query = query;
    }
    //seacrch
    search(searchableFields: string[]) {
        const searchTerms = this?.query?.search;
        if (searchTerms) {
            this.modelquery = this.modelquery.find({
                $or: searchableFields.map(
                    (fields) =>
                        ({ [fields]: { $regex: searchTerms, $options: 'i' }, }) as FilterQuery<T>,
                ),
            });
        }
        return this;
    }
    //filter 
    filter() {
        const queryObjcet = { ...this.query };
        const excludeFields = ['search', 'sortOrder', 'sortBy'];

        excludeFields?.forEach((k) => delete queryObjcet[k]);

        if (queryObjcet?.filter) {
            this.modelquery = this.modelquery.find({ author: queryObjcet.filter });
            delete queryObjcet.filter;
        }

        this.modelquery = this.modelquery.find(queryObjcet as FilterQuery<T>);
        return this;
    }
    //sortBy
    sortBy() {
        const sortBy =
            (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
        const sortOrder = this.query?.sortOrder === 'desc' ? '-' : '';
        this.modelquery = this.modelquery.sort(`${sortOrder}${sortBy}`)

        return this
    }
}

export default QueryBilder;