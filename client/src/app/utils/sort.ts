export class Sort{
    sortOrder:number = 1;
    collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    });

    constructor(){}

    public startSort(property: any, order: any, type: any ="", arrow: string=''){
        if(order == "desc"){
            this.sortOrder = -1;
        } 
        return (a:any,b:any) =>{
            return this.collator.compare(a[property], b[property]) * this.sortOrder;
        }
    }

    sortData(a: any, b: any){
        if(a < b){
            return -1 *  this.sortOrder;
        }else if( a > b){
            return 1 * this.sortOrder;
        }else{
            return 0 * this.sortOrder;
        }
    }
}