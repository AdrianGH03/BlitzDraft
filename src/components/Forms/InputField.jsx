
export function InputField({ label, type, name, value, onChange, className }) {
    return (
      <div className={className} >
        <label htmlFor={name}>{label}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} />
      </div>
    );
  }