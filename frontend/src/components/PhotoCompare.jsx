export default function PhotoCompare({ beforeUrl, afterUrl }) {
  return (
    <div className="card photo-compare">
      <div>
        <h4>Before</h4>
        {beforeUrl ? <img src={beforeUrl} alt="Before work" className="compare-image" /> : <p className="muted-text">No photo</p>}
      </div>
      <div>
        <h4>After</h4>
        {afterUrl ? <img src={afterUrl} alt="After work" className="compare-image" /> : <p className="muted-text">No photo</p>}
      </div>
    </div>
  );
}
