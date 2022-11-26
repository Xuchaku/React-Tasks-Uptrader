type IComment = {
  name: string;
  text: string;
  createAt: Date;
  subComments: IComment[];
};
export default IComment;
