import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  image: string;
  status: 'available' | 'preorder';
}

const cars: Car[] = [
  {
    id: 1,
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    price: 12500000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    bodyType: 'Купе',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/a5a1c86a-bb5d-4e0c-b828-9a386e426081.jpg',
    status: 'available'
  },
  {
    id: 2,
    brand: 'Mercedes-Benz',
    model: 'S 500 4MATIC',
    year: 2024,
    price: 15800000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    bodyType: 'Седан',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/12571a2d-6bb5-4809-854b-dca78e1b3011.jpg',
    status: 'available'
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'A8 L 60 TFSI',
    year: 2024,
    price: 13200000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    bodyType: 'Седан',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/564ae7c9-b4f4-4708-a94a-82fe5925b3c0.jpg',
    status: 'preorder'
  }
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  const filteredCars = cars.filter(car => {
    if (selectedBrand !== 'all' && car.brand !== selectedBrand) return false;
    if (selectedFuel !== 'all' && car.fuel !== selectedFuel) return false;
    if (selectedTransmission !== 'all' && car.transmission !== selectedTransmission) return false;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (car.price < min || car.price > max) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">LUXURY AUTO GALLERY</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Услуги</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Icon name="Phone" size={16} className="mr-2" />
            +7 (495) 123-45-67
          </Button>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <img 
          src="https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/a5a1c86a-bb5d-4e0c-b828-9a386e426081.jpg" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 z-20 animate-fade-in">
          <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-4">
            Премиальные
            <br />
            <span className="text-primary">Автомобили</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl">
            Эксклюзивная коллекция автомобилей класса люкс. Индивидуальный подход к каждому клиенту.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Смотреть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Записаться на тест-драйв
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Наша коллекция
          </h2>

          <div className="bg-card border border-border rounded-lg p-6 mb-8 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Бренд</Label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все бренды" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все бренды</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                    <SelectItem value="Audi">Audi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Топливо</Label>
                <Select value={selectedFuel} onValueChange={setSelectedFuel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип топлива" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="Бензин">Бензин</SelectItem>
                    <SelectItem value="Дизель">Дизель</SelectItem>
                    <SelectItem value="Электро">Электро</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">КПП</Label>
                <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                  <SelectTrigger>
                    <SelectValue placeholder="Коробка передач" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="Автомат">Автомат</SelectItem>
                    <SelectItem value="Механика">Механика</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Цена</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Диапазон цен" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая</SelectItem>
                    <SelectItem value="0-10000000">До 10 млн</SelectItem>
                    <SelectItem value="10000000-15000000">10-15 млн</SelectItem>
                    <SelectItem value="15000000-999999999">Свыше 15 млн</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <Card 
                key={car.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden group">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge 
                    className="absolute top-4 right-4 bg-primary text-primary-foreground"
                  >
                    {car.status === 'available' ? 'В наличии' : 'Предзаказ'}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{car.brand}</p>
                      <h3 className="text-2xl font-bold text-foreground">{car.model}</h3>
                      <p className="text-sm text-muted-foreground">{car.year} год</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Fuel" size={16} />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Settings" size={16} />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Car" size={16} />
                      <span>{car.bodyType}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-3xl font-bold text-primary">
                      {car.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Записаться на тест-драйв
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Запись на тест-драйв</DialogTitle>
                        <DialogDescription>
                          {car.brand} {car.model} {car.year}
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="name">Имя</Label>
                          <Input id="name" placeholder="Введите ваше имя" className="bg-background border-border" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Телефон</Label>
                          <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" className="bg-background border-border" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your@email.com" className="bg-background border-border" />
                        </div>
                        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          Отправить заявку
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Car', title: 'Тест-драйв', desc: 'Испытайте автомобиль мечты' },
              { icon: 'CreditCard', title: 'Кредитование', desc: 'Выгодные условия от банков' },
              { icon: 'ArrowLeftRight', title: 'Trade-In', desc: 'Обмен вашего авто' },
              { icon: 'Wrench', title: 'Сервис', desc: 'Обслуживание премиум-класса' }
            ].map((service, index) => (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-xl transition-all duration-300 bg-card border-border hover:border-primary animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={service.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Car" size={32} className="text-primary" />
                <h3 className="text-xl font-bold text-primary">LUXURY AUTO GALLERY</h3>
              </div>
              <p className="text-muted-foreground">
                Эксклюзивные автомобили премиум-класса
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-foreground">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@luxuryauto.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, Кутузовский пр-т, 36
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-foreground">Время работы</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Пн-Пт: 9:00 - 21:00</p>
                <p>Сб-Вс: 10:00 - 20:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 Luxury Auto Gallery. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
