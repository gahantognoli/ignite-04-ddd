import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await expect(
      async () =>
        await sut.execute({
          authorId: 'author-2',
          answerId: 'answer-1',
        }),
    ).rejects.toBeInstanceOf(Error)
  })
})
