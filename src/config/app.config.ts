import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.NODE_ENV === 'development' 
    ? parseInt(process.env.PROD_APP_PORT || '3000' , 10) // Sử dụng port mặc định là 3000 nếu không có giá trị
    : parseInt(process.env.DEV_APP_PORT || '3052', 10), // Port mặc định cho môi trường development
}));
