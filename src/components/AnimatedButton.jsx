import React from 'react'

const AnimatedButton = ({className=""}) => {
  return (
    <div className={`button ${className}`}>
					<div className="box">E</div>
					<div className="box">X</div>
					<div className="box">P</div>
					<div className="box">L</div>
					<div className="box">0</div>
					<div className="box">R</div>
					<div className="box">E</div>
				</div>
  )
}

export default AnimatedButton