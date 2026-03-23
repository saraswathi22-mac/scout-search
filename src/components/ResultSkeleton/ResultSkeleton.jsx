import "./ResultSkeleton.css";

function ResultSkeleton() {
    return (
        <div className="resultRow skeleton">
            <div className="result">
                <div className="siteInfoSkeleton" />

                <div className="titleSkeleton" />

                <div className="snippetSkeleton" />
                <div className="snippetSkeleton short" />
            </div>

            <div className="thumbnailSkeleton" />
        </div>
    );
}

export default ResultSkeleton;