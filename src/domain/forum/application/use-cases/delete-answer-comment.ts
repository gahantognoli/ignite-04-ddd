import { AnswerCommentsRepository } from '../repositories/answers-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answersCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answersCommentsRepository.findById(answerCommentId)

    if (!answerComment) throw new Error('Answer Comment Not Found.')

    if (authorId !== answerComment.authorId.toString())
      throw new Error('Not allowed.')

    await this.answersCommentsRepository.delete(answerComment)

    return {}
  }
}
