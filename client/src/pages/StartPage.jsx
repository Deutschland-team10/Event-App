import React, { useState } from 'react';
import { Users, Heart, MapPin, Calendar, Star, Download, Smartphone, Activity, Palette, Music, TreePine, Laptop, UtensilsCrossed } from 'lucide-react';

const StartPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const categoryItems = [
    { name: 'Spor', icon: Activity, color: 'bg-red-100 text-red-600' },
    { name: 'Sanat', icon: Palette, color: 'bg-pink-100 text-pink-600' },
    { name: 'Müzik', icon: Music, color: 'bg-purple-100 text-purple-600' },
    { name: 'Doğa', icon: TreePine, color: 'bg-green-100 text-green-600' },
    { name: 'Teknoloji', icon: Laptop, color: 'bg-blue-100 text-blue-600' },
    { name: 'Yemek', icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-600' }
  ];

  const features = [
    {
      icon: Users,
      title: 'Yeni İnsanlarla Tanış',
      description: 'Ortak ilgi alanlarına sahip insanlarla bağlantı kur ve yeni arkadaşlıklar edin.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Etkinlik Organize Et',
      description: 'Kendi etkinliklerinizi oluşturun ve benzer düşünen insanları bir araya getirin.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Keşfet & Katıl',
      description: 'Çevrenizdeki흥미로운 etkinlikleri keşfedin ve hemen katılın.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Aktif Üye', color: 'text-blue-600' },
    { value: '1.2K+', label: 'Aylık Etkinlik', color: 'text-green-600' },
    { value: '25+', label: 'Şehir', color: 'text-purple-600' },
    { value: '4.8', label: 'Ortalama Puan', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                EVENT<span className="text-blue-500">HUB</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-gray-600">Zaten üye misin?</span>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
                Giriş Yap
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <button className="w-full bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
                Giriş Yap
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Ortak İlgi Alanlarına Sahip İnsanları Bul & Harika Etkinliklere Katıl
                </h1>
                <p className="text-xl text-gray-600">
                  Daha fazla deneyim yaşamak ve yeni insanlarla tanışmak istediğinde katıl.
                </p>
              </div>
              
              <button className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-200 shadow-lg transform hover:scale-105">
                Ücretsiz Katıl
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <span className="text-gray-600">Mobil uygulamayı da indir:</span>
                <div className="flex space-x-3">
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors duration-200">
                    <Smartphone size={20} />
                    <span className="text-sm">Google Play</span>
                  </button>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors duration-200">
                    <Download size={20} />
                    <span className="text-sm">App Store</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl h-48 shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
                <div className="bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl h-48 shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl h-48 shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
                <div className="bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl h-48 shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Çevrenizdeki İnsanları Tanımanın Platformu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EventHub ile흥미진진한 aktivitelere katılın veya kendi etkinliklerinizi organize edin. 
              Boş zamanlarınızı spor, seyahat ve hobi aktiviteleriyle değerlendirin.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-transform duration-300">
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popüler Etkinlik Kategorileri
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoryItems.map((category, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${category.color}`}>
                  <category.icon size={32} />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Hayatınızı Renklendirmeye Hazır mısınız?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Bugün katılın ve yeni deneyimler yaşamaya başlayın!
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105">
            Hemen Başla - Ücretsiz
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">EventHub</div>
              <p className="text-gray-400">
                İnsanları bir araya getiren etkinlik platformu
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Nasıl Çalışır</li>
                <li className="hover:text-white cursor-pointer transition-colors">Etkinlik Oluştur</li>
                <li className="hover:text-white cursor-pointer transition-colors">Güvenlik</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Yardım Merkezi</li>
                <li className="hover:text-white cursor-pointer transition-colors">İletişim</li>
                <li className="hover:text-white cursor-pointer transition-colors">SSS</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Gizlilik</li>
                <li className="hover:text-white cursor-pointer transition-colors">Şartlar</li>
                <li className="hover:text-white cursor-pointer transition-colors">Çerezler</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventHub. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StartPage;