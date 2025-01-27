import React from 'react';

const Sidebar = ({
  isRotationEnabled,
  setIsRotationEnabled,
  isSizeAdjustmentEnabled,
  setIsSizeAdjustmentEnabled,
  isStillnessTimeEnabled,
  setIsStillnessTimeEnabled,
  setStillnessTime
}) => {
  return (
    <div className="sidebar">
      <h2>Features</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isRotationEnabled}
            onChange={() => setIsRotationEnabled(!isRotationEnabled)}
          />
          Rotation
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isSizeAdjustmentEnabled}
            onChange={() => setIsSizeAdjustmentEnabled(!isSizeAdjustmentEnabled)}
          />
          Size Adjustment
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isStillnessTimeEnabled}
            onChange={() => {
                setIsStillnessTimeEnabled(!isStillnessTimeEnabled), setStillnessTime(0)
            }
            }
          />
          Stillness Time
        </label>
      </div>
    </div>
  );
};

export default Sidebar;