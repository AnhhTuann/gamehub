const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🎮 Bắt đầu quy trình seeding dữ liệu GameHub...');

  try {
    // 1. Dọn dẹp dữ liệu cũ theo đúng thứ tự ràng buộc khóa ngoại
    console.log('🧹 Đang dọn dẹp dữ liệu cũ trong CSDL...');
    await prisma.review.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.game.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.user.deleteMany();
    await prisma.coupon.deleteMany();

    console.log('✅ Đã dọn dẹp xong toàn bộ CSDL.');

    // 2. Khởi tạo mã giảm giá Coupon mẫu
    console.log('🎫 Đang khởi tạo Coupon mẫu...');
    await prisma.coupon.createMany({
      data: [
        { code: 'WELCOMENEOGAMER', type: 'PERCENTAGE', value: 15, isActive: true },
        { code: '8BITNOSTALGIA', type: 'FIXED', value: 5, isActive: true }
      ]
    });

    // 3. Khởi tạo người dùng (Users)
    console.log('👤 Đang tạo tài khoản mẫu...');
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedGamerPassword = await bcrypt.hash('gamer123', 10);

    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@gamehub.io',
        name: 'RetroAdmin_01',
        password: hashedAdminPassword,
        role: 'ADMIN',
        isActive: true
      }
    });

    const gamerUser = await prisma.user.create({
      data: {
        email: 'gamer99@gamehub.io',
        name: 'RetroGamer99',
        password: hashedGamerPassword,
        role: 'CUSTOMER',
        isActive: true
      }
    });

    console.log('✅ Đã tạo tài khoản Admin (admin@gamehub.io / admin123) và Gamer (gamer99@gamehub.io / gamer123)');

    // 4. Tạo Genres (Thể loại game)
    console.log('📂 Đang tạo các thể loại game (Genres)...');
    
    const rpgGenre = await prisma.genre.create({
      data: { name: 'RPG', rawgId: 5, slug: 'role-playing-games-rpg' }
    });

    const fightingGenre = await prisma.genre.create({
      data: { name: 'Fighting', rawgId: 6, slug: 'fighting' }
    });

    const platformerGenre = await prisma.genre.create({
      data: { name: 'Platformer', rawgId: 83, slug: 'platformer' }
    });

    const actionGenre = await prisma.genre.create({
      data: { name: 'Action', rawgId: 4, slug: 'action' }
    });

    const shooterGenre = await prisma.genre.create({
      data: { name: 'Shooter', rawgId: 2, slug: 'shooter' }
    });

    console.log('✅ Đã tạo các Genres thành công.');

    // 5. Tạo Games mẫu
    console.log('👾 Đang chèn danh sách Game mẫu vào CSDL...');
    
    const gamesData = [
      {
        rawgId: 52864,
        title: 'Chrono Trigger Reborn',
        description: 'Chrono Trigger is a classic role-playing game developed by Square. It features active-time battles, deep characters, and time-travel mechanics.',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        price: 14.99,
        rating: 4.9,
        released: '1995-03-11',
        genreId: rpgGenre.id
      },
      {
        rawgId: 52932,
        title: 'Street Fighter II: Turbo',
        description: 'The legendary head-to-head fighting game that set the standard for fighting combat and introduced legendary warriors like Ryu and Ken.',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
        price: 9.99,
        rating: 4.4,
        released: '1991-02-06',
        genreId: fightingGenre.id
      },
      {
        rawgId: 25076,
        title: 'Super Mario World 8-Bit',
        description: 'Guide Mario and Luigi through dinosaur land to rescue Princess Peach. The definitive platformer game introducing Yoshi!',
        image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80',
        price: 19.99,
        rating: 4.8,
        released: '1990-11-21',
        genreId: platformerGenre.id
      },
      {
        rawgId: 56123,
        title: 'Metroid Prime: Retro Edition',
        description: 'Step into Samus Aran\'s boots in a gorgeous first-person adventure through the alien world of Tallon IV, optimizing exploration and battle.',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
        price: 29.99,
        rating: 4.6,
        released: '2002-11-17',
        genreId: actionGenre.id
      },
      {
        rawgId: 24003,
        title: 'Castlevania: Symphony of the Night',
        description: 'Explore Dracula\'s massive castle as Alucard, fighting night creatures and unlocking epic Metroidvania abilities in this legendary title.',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
        price: 15.99,
        rating: 4.7,
        released: '1997-03-20',
        genreId: platformerGenre.id
      }
    ];

    for (const game of gamesData) {
      await prisma.game.create({ data: game });
      console.log(`🎮 Đã chèn Game: "${game.title}"`);
    }

    console.log('\n🌟 Seeding thành công! Toàn bộ cơ sở dữ liệu GameHub đã sẵn sàng để hoạt động!');

  } catch (error) {
    console.error('❌ Lỗi khi thực hiện Seeding dữ liệu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
