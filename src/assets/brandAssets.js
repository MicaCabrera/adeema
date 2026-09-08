const driveImage = (id, size = 1200) => `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;

export const BRAND_ASSETS = {
  logoPrimary: driveImage('14Q3dPnw2gHuhzPXEg574dCfnS5OztOA5', 1600),
  logoOnDark: driveImage('1qi22J3tFE5REfdctW07j7hOjbwuejzLb', 1600),
  logoBlueDark: driveImage('1whx3SlXyfVbe0U7TZKdraKflJIQ_n7R-', 1600),
  emblemPrimary: driveImage('1SkoCe18rrQSyodPpuMNCX5mKZH-wSvF1', 1000),
  emblemNegative: driveImage('1iTek7K_Th7GrPlf7pHAJwoGTpU8JWnuI', 1000),
  emblemBlueDark: driveImage('14f2o3l6edqSA6haUzJvVSswF_TV7CHfP', 1000),
};

