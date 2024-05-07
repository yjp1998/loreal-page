import React, { useState, useRef, useEffect } from 'react';

const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isPassed, setIsPassed] = useState(false); // 用于跟踪验证是否通过
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    if (isDragging.current || isPassed) return;

    isDragging.current = true;

    const onMouseMove = (e) => {
      if (!isDragging.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const sliderWidth = sliderRef.current.offsetWidth;
      const maxPosition = containerWidth - sliderWidth;

      const newPosition = e.clientX - containerRef.current.getBoundingClientRect().left;
      const newPositionClamp = Math.min(Math.max(newPosition, 0), maxPosition);

      setSliderPosition(newPositionClamp);
    };

    const onMouseUp = () => {
      isDragging.current = false;

      const sliderLeft = sliderRef.current.offsetLeft;
      if (sliderLeft === containerRef.current.offsetWidth - sliderRef.current.offsetWidth) {
        setIsPassed(true); // 设置验证通过状态
      } else {
        setIsPassed(false);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  };

  useEffect(() => {
    if (isPassed) {
      // 验证通过后的处理逻辑，例如显示提示信息
      alert('验证通过');
      // 这里可以添加更多的逻辑，比如跳转到另一个页面或提交表单
    }
  }, [isPassed]);

  return (
    <div className="slider-container" ref={containerRef} onMouseDown={handleMouseDown} style={{ position: 'relative', width: '300px', height: '40px', background: '#ddd', cursor: 'pointer' }}>
      <div 
        ref={sliderRef} 
        className={`slider ${isPassed ? 'passed' : ''}`} 
        style={{ position: 'absolute', top: '0', left: `${sliderPosition}px`, width: '40px', height: '100%', background: '#333', transition: 'left 0.3s' }}
      >
        <div className="slider-btn"></div>
      </div>
      {isPassed && <div className="verification-message">验证通过</div>}
    </div>
  );
};

export default Slider;