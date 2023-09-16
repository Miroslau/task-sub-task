export declare class Pagination<PaginationEntity> {
    results: PaginationEntity[];
    page_total: number;
    total: number;
    constructor(paginationResults: PaginationResultsInterface<PaginationEntity>);
}
