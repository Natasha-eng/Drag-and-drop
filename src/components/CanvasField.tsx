import {addFigure, CanvasItemType, changeCopyStatus} from "../redux/DnDReducer";
import {useDispatch, useSelector} from "react-redux";
import React, {DragEvent} from "react";
import style from "../App.module.css";
import {CanvasFigure} from "./CanvasFigure";
import {RootStateType} from "../redux/store";


type CanvasFieldPropsType = {
    title: string
    items: Array<CanvasItemType>
}

export const CanvasField = React.memo(({title, items}: CanvasFieldPropsType) => {
    const dispatch = useDispatch()
    const copyStatus = useSelector<RootStateType, boolean>(state => state.dndFigures.createCopy)

    const onDropFigure = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (!copyStatus) {
            return
        }
        dispatch(addFigure())
    }

    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const changeCopyStatusHandler = () => {
        dispatch(changeCopyStatus(false))
    }

    return (
        <div className={style.canvasField} onDrop={onDropFigure} onDragOver={onDragOverHandler}
             onDragStart={changeCopyStatusHandler}>
            <h1 className={style.fieldTitle}>{title}</h1>
            {items.map(i => <CanvasFigure item={i}/>)}
        </div>
    )
})