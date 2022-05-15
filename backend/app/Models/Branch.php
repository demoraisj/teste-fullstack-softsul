<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    public string $name;
    public string $city;
    public string $cnpj;
    public string $address;
    public string $email;
    public string $latlng;

    protected $fillable = [
        'name',
        'city',
        'cnpj',
        'address',
        'email',
        'lat',
        'lng',
    ];

    public $visible = [
        'name',
        'city',
        'cnpj',
        'address',
        'email',
        'lat',
        'lng',
    ];
}
