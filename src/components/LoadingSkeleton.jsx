export default function LoadingSkeleton() {
    return (
        <div
            className="card shadow-sm mt-3"
            role="status"
            aria-live="polite"
            aria-label="Loading weather data"
        >
            <div className="card-body">
                {/* Header row: city/country + icon spot */}
                <div className="d-flex justify-content-between align-items-start mb-2 placeholder-glow">
                    <div className="w-50">
                        <div className="placeholder col-8 mb-1"></div>
                    </div>
                    <div
                        className="placeholder rounded-circle"
                        style={{ width: 64, height: 64 }}
                        aria-hidden="true"
                    />
                </div>

                {/* Details row: big temp + meta lines */}
                <div className="d-flex align-items-center gap-3 placeholder-glow">
                    <div className="display-6">
                        <span className="placeholder col-6" aria-hidden="true"></span>
                    </div>
                    <div className="w-100">
                        <div className="placeholder col-4 mb-2" aria-hidden="true"></div>
                        <div className="placeholder col-8" aria-hidden="true"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}