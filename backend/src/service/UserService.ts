import { UserGroupRepository, UserRepository } from "../repositories";

export const fetchPaginatedData = async (page: number, limit: number, role: string) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = await UserRepository.findAll({roles: {$in: [role]}});

    let paginatedData = users.slice(startIndex, endIndex);
    for (var i in paginatedData) {
        if (paginatedData[i]._id) {
            const ugroup = await UserGroupRepository.findOneWithGroupByUser(paginatedData[i]._id);
            if (ugroup) {
                paginatedData[i] = {...ugroup, ...paginatedData[i]}
            }   
        }
        
    }
    const nextPage = endIndex < users.length ? page + 1 : null;

    return { paginatedData, nextPage };
}
