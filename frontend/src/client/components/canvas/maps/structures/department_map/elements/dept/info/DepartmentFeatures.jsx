/**
 * 임성준
 * - 학과소개 오브젝트 생성 및 그림자 설정
 * - 애니메이션 설정 및 모달창 구현
 */
import React, { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { motion } from 'framer-motion-3d'
import DeptModal from '../modal/DeptModal'

export function DepartmentFeatures({name, deptInfoValue, deptInfoName, position, scale, ...props}) {
  const { scene, nodes, materials } = useGLTF('/assets/models/dept_info/department.glb')
  const [animationState, setAnimationState] = useState('y')
  
  const [meshRef, api] = useBox(() => ({
    args: [285, 60, 150],
    type: 'Static',
    mass: 1,
    position,
    ...props
  }))

  const handleAnimationComplete = () => {
    if(animationState === 'y') {
      setAnimationState((prevState) => (prevState === 'y' ? 'scale' : 'y'))
    }
  }

  useEffect(() => {
    scene.traverse((obj) => {
      if(obj.isObject3D) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  const handleClickDF = () => {
    
  }

  return (
    <>
      <motion.group
        ref={meshRef}
        position={position}
        onClick={handleClickDF}
        animate={
            animationState === 'y' 
            ? {
              y: [position[1] - 3, position[1]],
              scale: [0, scale + 2]
            }
            : {scale: [scale + 1.5, scale + 1, scale + 1.5]}
        }
        transition={
          animationState === 'y' 
          ? {
              delay: 1,
              duration: 0.5,
              ease: "easeIn"
          }
          : {
              duration: 1.3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
          }}
        onAnimationComplete={handleAnimationComplete}
        {...props}
      >
        <group position={[1.336, 0.794, 5.288]} scale={[0.042, 0.28, 0.506]}>
          <mesh geometry={nodes.Cube_1.geometry} material={materials.colorWhite} />
          <mesh geometry={nodes.Cube_2.geometry} material={materials.colorGreen} />
          <mesh geometry={nodes.Cube_3.geometry} material={materials.colorGrey} />
        </group>
      </motion.group>
      <group
        position={position}
      >
        {(deptInfoValue && (name === deptInfoName)) && (
              <DeptModal position={[0, -20, 30]} deptInfoName={deptInfoName} />
        )}
      </group>
    </>
  )
}

useGLTF.preload('/assets/models/dept_info/department.glb')