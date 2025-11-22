export const getStaticProps = async () => {
    return {
        projectRoot: process.env.NEXT_PUBLIC_PROJECT_ROOT ?? null,
        reportDir: process.env.NEXT_PUBLIC_REPORT_DIR ?? null,
        libRoot: process.env.NEXT_PUBLIC_LIB_ROOT ?? null,
    };
};