import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import './App.css';

const FurnitureConfigurator = () => {
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [result, setResult] = useState(null);

  const handleFurnitureSelection = (furniture) => {
    setSelectedFurniture(furniture);
    setSelectedColor(null);
    setResult(null);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleResult = () => {
    if (selectedFurniture && selectedColor) {
      setResult(`Вы выбрали ${selectedFurniture} с цветом ${selectedColor}`);
    }
  };

  const handleReset = () => {
    setSelectedFurniture(null);
    setSelectedColor(null);
    setResult(null);
  };

  return (
    <div className="configurator-container">
      <h2>Конфигуратор</h2>
      <div className={'item'}>
        <h3>Выберите товар:</h3>
        <button
          onClick={() => handleFurnitureSelection('Стул')}
          className={selectedFurniture === 'Стул' ? 'selected' : ''}
        >
          Стул
        </button>
        <button
          onClick={() => handleFurnitureSelection('Стол')}
          className={selectedFurniture === 'Стол' ? 'selected' : ''}
        >
          Стол
        </button>
      </div>
      {selectedFurniture && (
        <div className={'color'}>
          <h3>Выберите цвет:</h3>
          <div>
            <button
              onClick={() => handleColorSelection('#ff0000')}
              className={selectedColor === '#ff0000' ? 'selected' : ''}
            >
              Красный
            </button>
            <button
              onClick={() => handleColorSelection('#0000ff')}
              className={selectedColor === '#0000ff' ? 'selected' : ''}
            >
              Синий
            </button>
            <button
              onClick={() => handleColorSelection('#00ff00')}
              className={selectedColor === '#00ff00' ? 'selected' : ''}
            >
              Зеленый
            </button>
          </div>
        </div>
      )}
      {selectedColor && (
        <div className={'result'}>
          <button onClick={handleResult}>Заказать</button>
          <h3>{result && 'Ваш заказ:'}</h3>
          <p>{result}</p>
        </div>
      )}
      <div className="canvas-container">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {selectedFurniture === 'Стул' && <AnimatedBox color={selectedColor} />}
          {selectedFurniture === 'Стол' && <Table color={selectedColor} />}
        </Canvas>
      </div>
      {selectedFurniture || selectedColor || result ? (
        <button onClick={handleReset} className="reset-button">
          Сбросить
        </button>
      ) : null}
    </div>
  );
};

const AnimatedBox = ({ color }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Table = ({ color }) => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 0.8, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default FurnitureConfigurator;
