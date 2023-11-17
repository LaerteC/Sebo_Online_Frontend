import User from "./User"
import {Observable} from "rxjs";

export interface IPost {
    id: number;
    text: string;
    nomeLivro?: string; // Campo opcional
    generoLivro?: string; // Campo opcional
    imageUrl: string;
    voteCount: number;
    author: User;
    comentario: Post[];
    upVote: boolean;
    downVote: boolean;
}

export default class Post implements IPost {
    id: number;
    text: string;
    nomeLivro?: string; // Campo opcional
    generoLivro?: string; // Campo opcional
    imageUrl: string;
    voteCount: number;
    author: User;
    comentario: Post[];
    upVote: boolean;
    downVote: boolean;

    constructor(
        id: number,
        text: string,
        imageUrl: string,
        voteCount: number,
        author: User,
        comments: Post[],
        nomeLivro?: string, // Campo opcional
        generoLivro?: string // Campo opcional
    ) {
        this.id = id;
        this.text = text;
        this.imageUrl = imageUrl;
        this.voteCount = voteCount;
        this.author = author;
        this.comentario = comments;
        this.nomeLivro = nomeLivro;
        this.generoLivro = generoLivro;
    }
}
