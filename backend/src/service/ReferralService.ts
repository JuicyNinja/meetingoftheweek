import ReferralRepository from "../repositories/ReferralRepository";


export const fetchPaginatedData = async (page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const referrals = await ReferralRepository.findAll();

    const paginatedData = referrals.slice(startIndex, endIndex);
    const nextPage = endIndex < referrals.length ? page + 1 : null;

    return { paginatedData, nextPage };
}
