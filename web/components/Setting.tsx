/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { setListColumnNum } from '../settings/settingSlice'
import { RootState } from '../store'
import { Button, InputNumber } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import Modal from 'antd/es/modal/Modal'

const container = css`
  display: flex;
  flex-direction: column;
  margin: 5px 15px;
`

const rowItem = css`
  display: flex;
  align-items: center;
  margin: 8px 0;
`

function SettingPannel() {
  const dispatch = useDispatch()
  const columnNum = useSelector((state: RootState) => state.setting.listColumnNum)

  return (
    <div css={container}>
      <div css={rowItem}>
        <span>图片列数：</span>
        <InputNumber
          min={1}
          max={15}
          defaultValue={columnNum}
          onChange={(e) => dispatch(setListColumnNum(e))}
        />
      </div>
    </div>
  )
}

export default function Setting() {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)
  function handleSettingOk() {
    setIsSettingModalOpen(false)
  }

  function handleSettingCancel() {
    setIsSettingModalOpen(false)
  }

  return (
    <div>
      <Button
        css={css`
          margin: 8px;
        `}
        onClick={() => setIsSettingModalOpen(true)}
        shape="circle"
        icon={<SettingOutlined />}
      />
      <Modal
        footer={null}
        open={isSettingModalOpen}
        onOk={handleSettingOk}
        onCancel={handleSettingCancel}
      >
        <SettingPannel />
      </Modal>
    </div>
  )
}
