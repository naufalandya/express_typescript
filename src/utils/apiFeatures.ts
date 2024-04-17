class APIfeatures {
    query: any;
    queryString: any;

    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        //destruct requests
        const ObjQuery : Record<string, any>  = {...this.queryString}
        console.log(ObjQuery)

        //separation 
        const excludedFields : string[] = ['limit', 'page', 'sort', 'fields']
        excludedFields.forEach((el : string)=> delete ObjQuery[el])

        console.log(ObjQuery)
        console.log(excludedFields)

        //filter data
        let queryStr : string = JSON.stringify(ObjQuery)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        this.query.find(JSON.parse(queryStr));

        return this
    }

    sorting() {
        //sorting
        if (typeof this.queryString.sort === 'string') {
            const sortBy = this.queryString.sort.split('%').join(' ')
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }

    fieldLimiting(){
         if (typeof this.queryString.fields === 'string') {
            console.log(this.queryString.fields);
            const fieldsToIgnore = ['instructor'];
            const fields : string = this.queryString.fields
                            .split('%')
                            .filter((field: string)=> !fieldsToIgnore.includes(field))
                            .join(' ');
            this.query = this.query.select(`${fields}`);
        } else {
            this.query = this.query.select("-__v -instructor");
        }

        return this
    }

    pagination(){
         //pagination
         const rqp : any = this.queryString.page
         const page = rqp * 1 || 1

         const rql : any = this.queryString.limit 
         const limit = rql * 1 || 1

         const skip = (page - 1) * limit
         this.query = this.query.skip(skip).limit(limit)

        return this
    }
}

export default APIfeatures