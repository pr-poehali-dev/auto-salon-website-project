import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

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
  power?: string;
  acceleration?: string;
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
    status: 'available',
    power: '510 л.с.',
    acceleration: '3.9 сек'
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
    status: 'available',
    power: '435 л.с.',
    acceleration: '4.9 сек'
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
    status: 'preorder',
    power: '460 л.с.',
    acceleration: '4.4 сек'
  },
  {
    id: 4,
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    price: 18900000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    bodyType: 'Купе',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/124e87a6-5573-4653-bd4d-d8e93ad726ba.jpg',
    status: 'available',
    power: '650 л.с.',
    acceleration: '2.7 сек'
  },
  {
    id: 5,
    brand: 'Range Rover',
    model: 'Autobiography',
    year: 2024,
    price: 16500000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    bodyType: 'Внедорожник',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/75370568-65fa-4ff8-86e3-e1d7783e6263.jpg',
    status: 'available',
    power: '530 л.с.',
    acceleration: '4.5 сек'
  },
  {
    id: 6,
    brand: 'Bentley',
    model: 'Continental GT',
    year: 2024,
    price: 21200000,
    fuel: 'Бензин',
    transmission: 'Автомат',
    bodyType: 'Купе',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/4f6afd69-a8ef-4925-b290-aa94d5ca6a66.jpg',
    status: 'preorder',
    power: '635 л.с.',
    acceleration: '3.6 сек'
  }
];

const promos = [
  {
    id: 1,
    title: 'Специальное предложение на BMW M4',
    description: 'Выгода до 1 500 000 ₽',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/a5a1c86a-bb5d-4e0c-b828-9a386e426081.jpg',
    badge: 'Ограниченное предложение'
  },
  {
    id: 2,
    title: 'Trade-in с выгодой',
    description: 'Сдайте старый автомобиль и получите скидку до 20%',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/12571a2d-6bb5-4809-854b-dca78e1b3011.jpg',
    badge: 'Акция месяца'
  },
  {
    id: 3,
    title: 'Кредит от 0.01%',
    description: 'Специальные условия кредитования на весь модельный ряд',
    image: 'https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/564ae7c9-b4f4-4708-a94a-82fe5925b3c0.jpg',
    badge: 'Выгодно'
  }
];

const services = [
  {
    icon: 'TestTube2',
    title: 'Тест-драйв',
    description: 'Оцените все возможности автомобиля на тест-драйве'
  },
  {
    icon: 'CreditCard',
    title: 'Кредитование',
    description: 'Выгодные кредитные программы от ведущих банков'
  },
  {
    icon: 'RefreshCw',
    title: 'Trade-in',
    description: 'Обменяйте свой автомобиль с максимальной выгодой'
  },
  {
    icon: 'Wrench',
    title: 'Сервисное обслуживание',
    description: 'Профессиональное обслуживание и ремонт'
  },
  {
    icon: 'Shield',
    title: 'Страхование',
    description: 'Полный спектр страховых услуг'
  },
  {
    icon: 'FileText',
    title: 'Помощь в оформлении',
    description: 'Полное юридическое сопровождение сделки'
  }
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
            <a href="#promos" className="text-foreground hover:text-primary transition-colors">Акции</a>
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

      <section className="relative h-[600px] overflow-hidden">
        {promos.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <img 
              src={promo.image} 
              alt={promo.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="container mx-auto px-4 h-full flex items-center z-20 relative">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-primary text-primary-foreground">{promo.badge}</Badge>
                <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-4">
                  {promo.title}
                </h2>
                <p className="text-2xl text-muted-foreground mb-8">
                  {promo.description}
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Узнать подробнее
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        Записаться на тест-драйв
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Запись на тест-драйв</DialogTitle>
                        <DialogDescription>
                          Заполните форму и мы свяжемся с вами в ближайшее время
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Имя</Label>
                          <Input placeholder="Ваше имя" />
                        </div>
                        <div>
                          <Label>Телефон</Label>
                          <Input placeholder="+7 (___) ___-__-__" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" placeholder="your@email.com" />
                        </div>
                        <div>
                          <Label>Интересующая модель</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите модель" />
                            </SelectTrigger>
                            <SelectContent>
                              {cars.map(car => (
                                <SelectItem key={car.id} value={car.model}>
                                  {car.brand} {car.model}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Отправить заявку</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary w-8' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </section>

      <section id="catalog" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Наша коллекция
          </h2>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
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
                    <SelectItem value="Porsche">Porsche</SelectItem>
                    <SelectItem value="Range Rover">Range Rover</SelectItem>
                    <SelectItem value="Bentley">Bentley</SelectItem>
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
                    <SelectItem value="15000000-20000000">15-20 млн</SelectItem>
                    <SelectItem value="20000000-999999999">Свыше 20 млн</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {car.status === 'available' ? 'В наличии' : 'Предзаказ'}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{car.brand}</h3>
                      <p className="text-lg text-muted-foreground">{car.model}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{car.year}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Gauge" size={16} className="text-primary" />
                      <span>{car.power}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Zap" size={16} className="text-primary" />
                      <span>0-100: {car.acceleration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Fuel" size={16} className="text-primary" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Settings" size={16} className="text-primary" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4 mb-4">
                    <p className="text-3xl font-bold text-primary">
                      {car.price.toLocaleString()} ₽
                    </p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        Оставить заявку
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Заявка на {car.brand} {car.model}</DialogTitle>
                        <DialogDescription>
                          Заполните форму и наш менеджер свяжется с вами
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Имя</Label>
                          <Input placeholder="Ваше имя" />
                        </div>
                        <div>
                          <Label>Телефон</Label>
                          <Input placeholder="+7 (___) ___-__-__" />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" placeholder="your@email.com" />
                        </div>
                        <div>
                          <Label>Комментарий</Label>
                          <Textarea placeholder="Ваш комментарий" />
                        </div>
                        <Button className="w-full">Отправить заявку</Button>
                      </div>
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
          <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Полный спектр услуг для комфортной покупки и эксплуатации автомобиля
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="ghost" className="text-primary p-0 hover:bg-transparent">
                    Подробнее <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">О нашем автосалоне</h2>
              <p className="text-lg text-muted-foreground mb-6">
                LUXURY AUTO GALLERY — ведущий дилер премиальных автомобилей с 15-летней историей. 
                Мы предлагаем эксклюзивную коллекцию автомобилей класса люкс от мировых брендов.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">15+</p>
                  <p className="text-sm text-muted-foreground">Лет на рынке</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">5000+</p>
                  <p className="text-sm text-muted-foreground">Довольных клиентов</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">98%</p>
                  <p className="text-sm text-muted-foreground">Рекомендаций</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Официальный дилер</h4>
                    <p className="text-sm text-muted-foreground">Гарантия производителя и оригинальные запчасти</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Индивидуальный подход</h4>
                    <p className="text-sm text-muted-foreground">Персональный менеджер для каждого клиента</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Полное сопровождение</h4>
                    <p className="text-sm text-muted-foreground">От выбора до постановки на учёт</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/124e87a6-5573-4653-bd4d-d8e93ad726ba.jpg" 
                alt="Showroom" 
                className="rounded-lg w-full h-64 object-cover"
              />
              <img 
                src="https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/75370568-65fa-4ff8-86e3-e1d7783e6263.jpg" 
                alt="Cars" 
                className="rounded-lg w-full h-64 object-cover mt-8"
              />
              <img 
                src="https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/4f6afd69-a8ef-4925-b290-aa94d5ca6a66.jpg" 
                alt="Service" 
                className="rounded-lg w-full h-64 object-cover -mt-8"
              />
              <img 
                src="https://cdn.poehali.dev/projects/56d6bea1-fa45-41d2-86b2-445d0fa33835/files/564ae7c9-b4f4-4708-a94a-82fe5925b3c0.jpg" 
                alt="Team" 
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, Кутузовский проспект, д. 32</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    <p className="text-muted-foreground">+7 (495) 123-45-68</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@luxuryauto.ru</p>
                    <p className="text-muted-foreground">sales@luxuryauto.ru</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Часы работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 21:00</p>
                    <p className="text-muted-foreground">Сб-Вс: 10:00 - 20:00</p>
                  </div>
                </div>
              </div>
              
              <Card className="mt-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Напишите нам</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Имя</Label>
                      <Input placeholder="Ваше имя" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <Label>Сообщение</Label>
                      <Textarea placeholder="Ваше сообщение" rows={4} />
                    </div>
                    <Button className="w-full">Отправить</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-[600px] rounded-lg overflow-hidden border border-border">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=1234567890" 
                width="100%" 
                height="100%" 
                frameBorder="0"
                title="Карта"
                className="grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Car" size={28} className="text-primary" />
                <span className="text-xl font-bold">LUXURY AUTO</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Премиальные автомобили для истинных ценителей
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Новые автомобили</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">С пробегом</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Эксклюзив</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Тест-драйв</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Кредитование</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Trade-in</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сервис</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Подписка</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Получайте новости об акциях и новинках
              </p>
              <div className="flex gap-2">
                <Input placeholder="Email" className="text-sm" />
                <Button size="sm">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 LUXURY AUTO GALLERY. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {chatOpen && (
        <Card className="fixed bottom-24 right-6 w-80 shadow-2xl z-50">
          <CardContent className="p-0">
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <h3 className="font-semibold">Онлайн-консультант</h3>
              <button onClick={() => setChatOpen(false)} className="hover:opacity-80">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-4 h-64 overflow-y-auto bg-secondary/20">
              <div className="space-y-3">
                <div className="bg-card p-3 rounded-lg">
                  <p className="text-sm">Здравствуйте! Чем могу помочь?</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Введите сообщение..." className="text-sm" />
                <Button size="sm">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center z-50"
      >
        <Icon name="MessageCircle" size={24} />
      </button>
    </div>
  );
};

export default Index;
