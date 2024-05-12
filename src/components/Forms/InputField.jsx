
export function InputField({ label, type, name, value, onChange, className, placeholder }) {
    return (
      <div className={className} >
        <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      </div>
    );
  }