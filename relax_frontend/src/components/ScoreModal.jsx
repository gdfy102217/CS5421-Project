import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Collapse, Modal, Divider, Typography } from 'antd';
export const ScoreModal = ({ setOpenModal, openModal, score, answer, getGame }) => {
	const [disabled, setDisabled] = useState(true);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);
	const handleOk = (e) => {
		getGame();
		setOpenModal(false);
	};
	const handleCancel = (e) => {
		setOpenModal(false);
	};
	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};
	return (
		<>
			<Modal
				title={
					<div
						style={{
							width: '100%',
							cursor: 'move',
						}}
						onMouseOver={() => {
							if (disabled) {
								setDisabled(false);
							}
						}}
						onMouseOut={() => {
							setDisabled(true);
						}}
						onFocus={() => {}}
						onBlur={() => {}}
					>
						Your score in this game:
					</div>
				}
				open={openModal}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Try Another"
				cancelText="Go Back"
				modalRender={(modal) => (
					<Draggable
						disabled={disabled}
						bounds={bounds}
						nodeRef={draggleRef}
						onStart={(event, uiData) => onStart(event, uiData)}
					>
						<div ref={draggleRef}>{modal}</div>
					</Draggable>
				)}
			>
				<Typography.Text level={2}>{score} / 100</Typography.Text>
				<Divider/>
				<Collapse
					size="small"
					items={[{ key: '1', label: 'Answer for this game', children: <p>{answer}</p> }]}
				/>
			</Modal>
		</>
	);
};