export class Comment {
    rating!: number;
    comment!: string;
    author!: string;
    date!: string;


    // constructor(rating: number,comment: string,author: string,date: string)
    constructor()
    {
        this.author="";
        this.comment="";
        this.date="";
        this.rating=0;
    }
}