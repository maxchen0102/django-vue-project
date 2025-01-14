import React, { useState, useEffect } from 'react'
import './ExerciseList.css'

function ExerciseList() {
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [count, setCount] = useState(0)
    const [disabled, setDisabled] = useState(false)

      const stats = {
        weeklyWorkouts: 4,
        totalMinutes: 180,
        completedSets: 24
      };

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

    useEffect(() => {
        // fetchExercises()
    }, [])


    function handleClick() {
        if (count >= 10) {
            setDisabled(true)
            return
        }
        setCount(count + 1)
    }

    const handleDelete = () => {
        setLoading(true)
        try {
            setCount(count - 1)
        } finally {
            setLoading(false)
        }
    }

   return (
    <div className="min-vh-100 bg-light">
      {/* 導航欄 */}
      <nav className="navbar bg-primary">
        <div className="container">
          <span className="navbar-brand mb-0 h1 text-white">FitLife</span>
          <button className="btn text-white">
            <i className="bi bi-person fs-4"></i>
          </button>
        </div>
      </nav>

      {/* 主要內容區 */}
      <div className="container py-4">
        {/* 統計卡片 */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            {/* 健身次數 */}
            <div className="bg-light rounded p-3 mb-3">
              <p className="text-secondary mb-1">本週健身次數</p>
              <p className="text-primary fs-3 fw-bold mb-0">{stats.weeklyWorkouts}次</p>
            </div>

            {/* 訓練時間 */}
            <div className="bg-light rounded p-3 mb-3">
              <p className="text-secondary mb-1">累計訓練時間</p>
              <p className="text-primary fs-3 fw-bold mb-0">{stats.totalMinutes}分</p>
            </div>

            {/* 完成組數 */}
            <div className="bg-light rounded p-3">
              <p className="text-secondary mb-1">完成組數</p>
              <p className="text-primary fs-3 fw-bold mb-0">{stats.completedSets}組</p>
            </div>
          </div>
        </div>

        {/* 操作按鈕 */}
        <div className="d-flex flex-column gap-3">
          {/* 開始訓練按鈕 */}
          <div className="card shadow-sm">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary rounded-circle p-3 d-flex align-items-center justify-content-center  icon-container">
                <i className="bi bi-activity text-white fs-5"></i>
              </div>
              <div>
                <h6 className="mb-1">開始訓練</h6>
                <small className="text-secondary">記錄今天的訓練</small>
              </div>
            </div>
          </div>

          {/* 科學分析按鈕 */}
          <div className="card shadow-sm">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-info rounded-circle p-3 d-flex align-items-center justify-content-center icon-container">
                <i className="bi bi-graph-up text-white fs-5"></i>
              </div>
              <div>
                <h6 className="mb-1">科學分析</h6>
                <small className="text-secondary">專業數據分析</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseList