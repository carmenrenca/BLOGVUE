class Article{


    constructor(title, content, date , imagen, precio){
        this.title=title;
        this.content=content;
        this.date=null;
        this.imagen=imagen;
        this.precio=precio;
    }
/**title: String,
content: String,
date : {type:Date, default: Date.now},
imagen: String */
}

export default Article;