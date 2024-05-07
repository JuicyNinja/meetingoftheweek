import { OwnerRepository } from "../repositories";

export const fetchPaginatedData = async (page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const owners = await OwnerRepository.findAll();

    const paginatedData = owners.slice(startIndex, endIndex);
    const nextPage = endIndex < owners.length ? page + 1 : null;

    return { paginatedData, nextPage };
}
