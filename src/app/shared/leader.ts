
export class Leader {
    id!:string;
    name!:string;
    image!:string;
    designation!:string;
    abbr!:string;
    featured!:Boolean;
      // tslint:disable-next-line:max-line-length
    description!:string;
    

    constructor()
    {
        this.id="";
        this.name="";
        this.image="";
        this.designation="";
        this.abbr="";
        this.featured=false;
        // tslint:disable-next-line:max-line-length
        this.description="";
        
    }
}