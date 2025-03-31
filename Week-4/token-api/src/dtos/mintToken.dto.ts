import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class MintTokenDto {
  @ApiProperty({ example: '0x4cbe58c50480...', description: 'Recipient Ethereum address' })
  @IsEthereumAddress()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '10', description: 'Amount of tokens to mint' })
  @IsString()
  @IsPositive()
  amount: string;
}