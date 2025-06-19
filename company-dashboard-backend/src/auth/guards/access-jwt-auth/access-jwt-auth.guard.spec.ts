import { JwtAuthGuard } from './access-jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
