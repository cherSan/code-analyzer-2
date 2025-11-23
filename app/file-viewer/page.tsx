type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const FilePage = async ({
    searchParams,
}: Readonly<{
    searchParams: SearchParams
}>) => {
    const sp = await searchParams;

    return 'FilePage' + JSON.stringify(sp);
}

FilePage.displayName = 'FilePage';

export default FilePage;