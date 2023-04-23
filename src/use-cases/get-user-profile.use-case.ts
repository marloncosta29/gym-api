import { UserRepository } from "@/repositories/users.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProficeUseCaseRequest {
  id: string;
}
interface GetUserProficeUseCaseResponse {}

export class GetUserProfileUseCase {
  constructor(private userrepository: UserRepository) {}

  async execute({ id }: GetUserProficeUseCaseRequest) {
    const user = await this.userrepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
