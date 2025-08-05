import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { BooksService } from '../books/books.service';

describe('ReviewsService.getAvg', () => {
    let service: ReviewsService;
    const mockBooksService = { findOne: jest.fn() };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewsService,
                { provide: BooksService, useValue: mockBooksService },  // mock dependency
            ],
        }).compile();

        service = module.get<ReviewsService>(ReviewsService);
    });

    afterEach(jest.clearAllMocks);

    it('returns the average rating for a book with reviews', () => {
        // Arrange
        mockBooksService.findOne.mockReturnValue({ id: 1, title: 'Dummy' });
        // Populate the private Map  (TypeScript lets us reach in with bracket-notation)
        (service as any).reviewsByBook = new Map([
            [1, [{ rating: 4 }, { rating: 5 }, { rating: 5 }]],
        ]);

        // Act
        const avg = service.getAvg(1);

        // Assert
        expect(avg).toBeCloseTo(4.67, 2);   // (14 / 3) = 4.666…
        expect(mockBooksService.findOne).toHaveBeenCalledWith(1);
    });

    it('returns 0 when the book has no reviews', () => {
        mockBooksService.findOne.mockReturnValue({ id: 2 });
        (service as any).reviewsByBook = new Map([[2, []]]);

        expect(service.getAvg(2)).toBe(0);
    });

    it('re-throws NotFoundException when the book does not exist', () => {
        mockBooksService.findOne.mockImplementation(() => {
            throw new NotFoundException();
        });

        expect(() => service.getAvg(999)).toThrow(NotFoundException);
    });
});
