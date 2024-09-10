type ThreadCategory = "THREAD" | "QNA";

type User = {
	userName: string;
  	userId: number;
  	isModerator: boolean;
  	password: string;
}

interface Thread {
	id: string;
	category: ThreadCategory;
	title: string;
	description: string;
	creationDate: Date;
	creator?: string
	comments?: ThreadComment[];
	locked?: boolean;
}

type QNAThread =  Thread & { //Type extension
	category: "QNA";
	isAnswered: boolean;
	commentAnswerId?: number;
}

type ThreadComment = {
	id: User; //kan skapa buggar
	thread: Thread;
	content: string;
	creator: "GUEST"; //ändra
}

type SubmitForm = {
	title:string,
	description:string
}

type ErrorForm = SubmitForm & {
	selection:string
}

type LoginFormData = {
	username: string;
	password: string;
};
