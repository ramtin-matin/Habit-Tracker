function ColorPicker({ colors, value, onChange }) {
  return (
    <div className="mt-3 grid w-full grid-cols-[repeat(13,minmax(0,1fr))] gap-2.5">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className="h-5 w-5 justify-self-center rounded-full transition-transform hover:scale-110 cursor-pointer"
          style={{
            backgroundColor: color,
            boxShadow:
              // Inner dark ring keeps contrast on bright colors; outer ring marks selection.
              value === color
                ? `0 0 0 2px rgba(15,23,42,1), 0 0 0 4px ${color}99`
                : "0 0 0 1px rgba(15,23,42,0.9)",
          }}
          aria-label={`Choose color ${color}`}
          aria-pressed={value === color}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
