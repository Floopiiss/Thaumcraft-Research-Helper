import "./ConnectionWindow.css";
import { Rnd } from "react-rnd";
import type { ConnectionWindowProps } from "../../types/types";
import ConnectionWindowContent from "../ConnectionWindowContent";

export default function ConnectionWindow({
  x,
  y,
  width,
  height,
  connection,
  onMove,
  onResize,
  onClose,
}: ConnectionWindowProps) {
  return (
    <Rnd
      className="draggable-container"
      size={{ width, height }}
      position={{ x, y }}
      cancel=".close-btn"
      dragHandleClassName="titlebar"
      onDragStop={(_, d) => onMove({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, position) =>
        onResize({
          x: position.x,
          y: position.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        })
      }
    >
      <div className="titlebar">
        <div className="title">Connections</div>
        <button
          className="close-btn"
          aria-label="Close"
          onClick={() => onClose && onClose()}
        >
          ×
        </button>
      </div>
      <div className="content">
        <ConnectionWindowContent connection={connection} />
      </div>
    </Rnd>
  );
}
