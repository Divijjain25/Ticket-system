import React from 'react';
import styles from './CircleProgress.module.css'

const CircleProgress = ({ percentage }) => {
  return (
    <div
      className={styles.circle}
      style={{ '--percent': `${percentage}%` }}
    >
      <div className={styles.innerCircle}>
        <span>{percentage}%</span>
      </div>
    </div>
  );
};

export default CircleProgress;