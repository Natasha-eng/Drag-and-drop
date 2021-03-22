import {CanvasItemType, changeFigureStyle, chooseFigure} from "../redux/DnDReducer";
import {useDispatch} from "react-redux";
import React, {MouseEvent, DragEvent} from "react";
import style from "../App.module.css";

type CanvasFigurePropsType = {
    item: CanvasItemType
}

export const CanvasFigure = React.memo((props: CanvasFigurePropsType) => {

    const dispatch = useDispatch()

    const chooseFigureHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (e.button === 0) {
            dispatch(chooseFigure(props.item.canvasId))
            dispatch(changeFigureStyle(props.item.canvasId))
        }
    }

    const onStartDragFigureHandler = (e: DragEvent<HTMLDivElement>) => {
        if (e.button === 0) {
            dispatch(chooseFigure(props.item.canvasId))
        }
    }

    return (
        <div draggable className={style.figures} onDragStart={onStartDragFigureHandler}>
            <div style={props.item.figure.class} onClick={chooseFigureHandler}>
            </div>
        </div>
    )
})
