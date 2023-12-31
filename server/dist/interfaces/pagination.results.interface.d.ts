interface PaginationResultsInterface<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    next?: string;
    previous?: string;
}
