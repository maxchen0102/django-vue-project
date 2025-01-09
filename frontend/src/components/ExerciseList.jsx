import { useState, useEffect } from 'react'
import './ExerciseList.css'

function ExerciseList() {
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchExercises = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('http://localhost:11111/api/exercises/')
            if (!response.ok) {
                throw new Error('網路請求失敗')
            }
            const data = await response.json()
            setExercises(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // 組件掛載時自動獲取數據
    useEffect(() => {
        fetchExercises()
    }, [])

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-50">
                <div className="spinner-border loading-spinner text-primary" role="status">
                    <span className="visually-hidden">載入中...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid container-md py-3 py-md-4">
            <div className="exercise-header p-3 p-md-4 mb-3 mb-md-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 gap-md-0">
                    <div className="w-100 w-md-auto">
                        <h1 className="h3 mb-2">運動項目列表</h1>
                        <p className="text-muted d-none d-md-block mb-0">探索並追蹤您的運動計劃</p>
                    </div>
                    <button
                        onClick={fetchExercises}
                        disabled={loading}
                        className="btn btn-primary w-100 w-md-auto d-flex align-items-center justify-content-center gap-2"
                    >
                        <i className="bi bi-arrow-clockwise"></i>
                        {loading ? '載入中...' : '重新載入'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger mx-2 mx-md-0" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            )}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 g-md-4">
                {exercises.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <i className="bi bi-clipboard-x display-1 text-muted mb-4 d-block"></i>
                        <h3 className="h4 mb-3">尚無運動項目</h3>
                        <p className="text-muted">目前沒有任何運動項目。</p>
                    </div>
                ) : (
                    exercises.map((exercise) => (
                        <div className="col" key={exercise.id}>
                            <div className="card exercise-card h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="card-title text-truncate mb-0" title={exercise.name}>
                                            {exercise.name}
                                        </h5>
                                        <span className="badge bg-primary ms-2 text-nowrap">運動</span>
                                    </div>
                                    <p className="card-text exercise-description">
                                        {exercise.description}
                                    </p>
                                </div>
                                <div className="card-footer bg-light">
                                    <div className="d-flex flex-column gap-1">
                                        <small className="text-muted d-flex align-items-center">
                                            <i className="bi bi-calendar-plus me-2"></i>
                                            建立時間: {new Date(exercise.created_at).toLocaleString()}
                                        </small>
                                        <small className="text-muted d-flex align-items-center">
                                            <i className="bi bi-calendar-check me-2"></i>
                                            更新時間: {new Date(exercise.updated_at).toLocaleString()}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ExerciseList