const BrandLogoImage = ({ className = "" }) => {
  return (
    <img 
      src="/images/logo_horizontal_transparent.png" 
      alt="Rohit Tejpal" 
      className={`object-contain ${className}`}
    />
  );
};

export default BrandLogoImage;
